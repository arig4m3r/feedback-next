import React from 'react'
import SolutionsModal from './SolutionsModal'

type Props = { feedback: Feedback }

export default function FeedbackComponent({ feedback: { message, rating, positive, improve, targets, changes } }: Props) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {message}
            </th>
            <td className={`px-6 py-4 ${rating < 5 ? "text-red-500" : rating < 7 ? "text-yellow-500" : "text-green-500"}`}>
                {rating}
            </td>
            <td className={`px-6 py-4 ${positive ? "text-green-500" : "text-red-500"}`}>
                {positive ? "Positiva" : "Negativa"}
            </td>
            <td className="px-6 py-4">
                {targets.length > 1 ? targets.join(', ') : "Nenhum"}
            </td>
            <td className="px-6 py-4">
                {changes.length > 1 ? changes.join(', ') : "Nada"}
            </td>
            <td className="px-6 py-4">
                <SolutionsModal message={improve ?? "Não há nada para melhorar"} />
            </td>
        </tr>
    )
}