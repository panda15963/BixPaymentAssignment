import { useLocation } from 'react-router-dom';

export function useCategory(defaultCategory = 'NOTICE') {
    const location = useLocation();
    return (
        new URLSearchParams(location.search).get('category') ??
        defaultCategory
    );
}