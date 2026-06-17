import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../ApiService';
import { useToast } from '../context/ToastContext';

const EMPTY_FORM = {
    title: '',
    author: '',
    publisher: '',
    price: '',
    condition: '상',
    seller: '',
};

const CONDITION_OPTIONS = ['최상', '상', '중', '하'];

const BookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast, setIsLoading } = useToast();
    const isEditMode = Boolean(id);

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    const pageTitle = useMemo(
        () => (isEditMode ? '교재 정보 수정' : '교재 등록'),
        [isEditMode]
    );

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const fetchBook = async () => {
            setIsLoading(true);
            try {
                const book = await api.get(`/api/books/${id}`);
                setForm({
                    title: book.title ?? '',
                    author: book.author ?? '',
                    publisher: book.publisher ?? '',
                    price: String(book.price ?? ''),
                    condition: book.condition ?? '상',
                    seller: book.seller ?? '',
                });
            } catch (error) {
                showToast(error.message, 'error');
                navigate('/books');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBook();
    }, [id, isEditMode, navigate, setIsLoading, showToast]);

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const nextErrors = {};
        const requiredFields = ['title', 'author', 'publisher', 'condition', 'seller'];

        requiredFields.forEach((field) => {
            if (!form[field].trim()) {
                nextErrors[field] = '필수 입력 항목입니다.';
            }
        });

        const priceNumber = Number(form.price);
        if (form.price === '' || Number.isNaN(priceNumber)) {
            nextErrors.price = '가격을 숫자로 입력해 주세요.';
        } else if (priceNumber < 0) {
            nextErrors.price = '가격은 0원 이상이어야 합니다.';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            showToast('입력값을 다시 확인해 주세요.', 'error');
            return;
        }

        const payload = {
            ...form,
            title: form.title.trim(),
            author: form.author.trim(),
            publisher: form.publisher.trim(),
            price: Number(form.price),
            condition: form.condition.trim(),
            seller: form.seller.trim(),
        };

        setIsLoading(true);
        try {
            const savedBook = isEditMode
                ? await api.put(`/api/books/${id}`, payload)
                : await api.post('/api/books', payload);

            showToast(
                isEditMode ? '교재 정보가 수정되었습니다.' : '교재가 등록되었습니다.',
                'success'
            );
            navigate(`/books/${savedBook.id}/edit`);
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setForm(EMPTY_FORM);
        setErrors({});
    };

    return (
        <section className="book-form-page">
            <div className="book-form-header">
                <div>
                    <h1>{pageTitle}</h1>
                    <p className="book-form-description">
                        중고 교재 판매에 필요한 기본 정보를 입력해 주세요.
                    </p>
                </div>
                <Link className="secondary-action" to="/books">
                    목록으로
                </Link>
            </div>

            <form className="book-form" onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                    <label className="field">
                        <span>교재명</span>
                        <input
                            name="title"
                            value={form.title}
                            onChange={updateField}
                            placeholder="예: 클라우드 컴퓨팅 입문"
                        />
                        {errors.title && <small>{errors.title}</small>}
                    </label>

                    <label className="field">
                        <span>저자</span>
                        <input
                            name="author"
                            value={form.author}
                            onChange={updateField}
                            placeholder="예: 홍길동"
                        />
                        {errors.author && <small>{errors.author}</small>}
                    </label>

                    <label className="field">
                        <span>출판사</span>
                        <input
                            name="publisher"
                            value={form.publisher}
                            onChange={updateField}
                            placeholder="예: 한빛아카데미"
                        />
                        {errors.publisher && <small>{errors.publisher}</small>}
                    </label>

                    <label className="field">
                        <span>가격</span>
                        <input
                            name="price"
                            type="number"
                            min="0"
                            step="100"
                            value={form.price}
                            onChange={updateField}
                            placeholder="예: 18000"
                        />
                        {errors.price && <small>{errors.price}</small>}
                    </label>

                    <label className="field">
                        <span>상태</span>
                        <select name="condition" value={form.condition} onChange={updateField}>
                            {CONDITION_OPTIONS.map((condition) => (
                                <option key={condition} value={condition}>
                                    {condition}
                                </option>
                            ))}
                        </select>
                        {errors.condition && <small>{errors.condition}</small>}
                    </label>

                    <label className="field">
                        <span>판매자</span>
                        <input
                            name="seller"
                            value={form.seller}
                            onChange={updateField}
                            placeholder="예: 홍길동"
                        />
                        {errors.seller && <small>{errors.seller}</small>}
                    </label>
                </div>

                <div className="form-actions">
                    {!isEditMode && (
                        <button type="button" className="secondary-action" onClick={handleReset}>
                            초기화
                        </button>
                    )}
                    <button type="submit" className="primary-action">
                        {isEditMode ? '수정 완료' : '등록하기'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default BookForm;
