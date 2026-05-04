import React from 'react'

interface PriceBreakdownProps {
  courseFee: number
  venueFee?: number
  total: number
}

const s: Record<string, React.CSSProperties> = {
  container: {
    fontSize: 12,
    lineHeight: 2.2,
    color: '#4A3B3C',
  },
  lineItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#8B7E74',
  },
  amount: {
    fontWeight: 500,
    color: '#4A3B3C',
  },
  divider: {
    border: 0,
    borderTop: '1px solid #F0E8E0',
    margin: '6px 0',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontWeight: 600,
    color: '#4A3B3C',
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: 700,
    color: '#E8B4A2',
  },
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ courseFee, venueFee, total }) => {
  return (
    <div style={s.container}>
      <div style={s.lineItem}>
        <span style={s.label}>课程费（教练教学）</span>
        <span style={s.amount}>¥{courseFee}</span>
      </div>

      {venueFee !== undefined && venueFee > 0 && (
        <div style={s.lineItem}>
          <span style={s.label}>场地费（场馆使用）</span>
          <span style={s.amount}>¥{venueFee}</span>
        </div>
      )}

      <hr style={s.divider} />

      <div style={s.totalRow}>
        <span style={s.totalLabel}>合计</span>
        <span style={s.totalAmount}>¥{total}</span>
      </div>
    </div>
  )
}

export default PriceBreakdown
