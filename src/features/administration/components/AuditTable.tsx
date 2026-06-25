export function AuditTable() {
  const rows = [
    {
      actor: 'Ops Lead',
      action: 'Approved response update',
      time: '09:14',
      status: 'Success',
    },
    {
      actor: 'Review Committee',
      action: 'Opened shortlist pack',
      time: '09:27',
      status: 'Review',
    },
    {
      actor: 'Privacy Officer',
      action: 'Flagged identity route',
      time: '09:41',
      status: 'Warning',
    },
  ];

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
      }}
    >
      <thead>
        <tr>
          <th align="left">Actor</th>
          <th align="left">Action</th>
          <th align="left">Time</th>
          <th align="left">Status</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.actor}</td>
            <td>{row.action}</td>
            <td>{row.time}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}