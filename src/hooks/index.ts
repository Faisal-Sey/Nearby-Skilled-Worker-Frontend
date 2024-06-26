import { useState } from 'react';

const useForm = (initialState: any) => {
    const [state, setState] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return { state, handleChange };
};

export default useForm;
