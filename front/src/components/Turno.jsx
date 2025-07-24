export default function Turno({ userName, date, time, description, status, onCancel }) {
  const statusClass = status === 'active' ? 'text-success' : 'text-danger';

  return (
    <tr>
      <td>{userName}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>{description}</td>
      <td className={statusClass}>{status}</td>
      <td>
        {status === 'active' && (
          <button onClick={onCancel} className="btn btn-sm btn-danger">
            Cancelar
          </button>
        )}
      </td>
    </tr>
  );
}
