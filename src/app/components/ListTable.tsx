import React from 'react'
import FeedbackComponent from './FeedbackComponent'

type Props = { feedbacks: Feedback[] }

export default function ListTable({ feedbacks }: Props) {
    return (
        <div className="relative overflow-x-auto mx-5 rounded-xl">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Avaliação
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nota
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Afetados
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Melhorar
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map(f => (
                        <FeedbackComponent feedback={f} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}