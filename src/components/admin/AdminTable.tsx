'use client'

interface Column<T> {
  key: string
  label: string
  render?: (row: T) => React.ReactNode
}

interface AdminTableProps<T extends { _id: string }> {
  data: T[]
  columns: Column<T>[]
  onEdit: (row: T) => void
  onDelete: (id: string) => void
  loading?: boolean
}

export default function AdminTable<T extends { _id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  loading,
}: AdminTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-lg font-medium">No records found</p>
        <p className="text-sm mt-1">Add your first entry using the button above.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map(col => (
              <th
                key={col.key}
                className="text-left px-5 py-3.5 text-gray-500 font-semibold text-xs uppercase tracking-wide"
              >
                {col.label}
              </th>
            ))}
            <th className="text-right px-5 py-3.5 text-gray-500 font-semibold text-xs uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map(row => (
            <tr key={row._id} className="hover:bg-gray-50 transition-colors">
              {columns.map(col => (
                <td key={col.key} className="px-5 py-4 text-gray-700 max-w-xs">
                  {col.render ? col.render(row) : String((row as any)[col.key] ?? '—')}
                </td>
              ))}
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row._id)}
                    className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
