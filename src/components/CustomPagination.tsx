import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePaginationStore } from '@/stores/usePaginationStore';

export function CustomPagination() {
  const { page, setPage } = usePaginationStore();
  const changePage = (next: number) => { setPage(next); window.scrollTo({ top: 0 }); };
  return <nav className="catalog-pagination" aria-label="Collection pages"><button className="button-secondary" disabled={page <= 1} onClick={() => changePage(Math.max(1, page - 5))}><ArrowLeft size={17} />Previous</button><span>Collection {Math.ceil(page / 5)}</span><button className="button-secondary" onClick={() => changePage(page + 5)}>Next collection<ArrowRight size={17} /></button></nav>;
}
