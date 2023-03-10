import { useQuery } from "react-query"
import { api } from "../services/axios";


type User = {
    name: string;
    email: string;
    profession: string;
    sex: string;
    id: string;
    created_at: string;
    updated_at: string;
}

type GetUserResponse = {
    user: User
}

export async function getUser(userId: string): Promise<GetUserResponse> {
    const data = await api.post(`/users/get/id`, {
        data: {
            userId
        }
    })

    const user: User = {
        name: data?.data?.data?.name,
        email: data?.data?.data?.email,
        profession: data?.data?.data?.profession,
        sex: data?.data?.data?.sex,
        id: data?.data?.ref['@ref']?.id,
        created_at: new Date(data?.data?.data?.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
        updated_at: new Date(data?.data?.data?.updated_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }
    
    return {
        user
    }
}


export function useUser(userId: string) {
    return useQuery(['users', userId], () => getUser(userId))
}