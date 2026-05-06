import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popup, Toast } from 'antd-mobile'
import { MapPinIcon, CheckIcon } from '../components/Icons'
import { useAppState, type Address } from '../store/AppContext'

export default function Addresses() {
  const nav = useNavigate()
  const { addresses, addAddress, updateAddress, removeAddress, setDefaultAddress } = useAppState()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formTag, setFormTag] = useState('')
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formFull, setFormFull] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Address | null>(null)

  const openAdd = () => {
    setEditingId(null)
    setFormTag('')
    setFormName('')
    setFormPhone('')
    setFormFull('')
    setShowForm(true)
  }

  const openEdit = (addr: Address) => {
    setEditingId(addr.id)
    setFormTag(addr.tag)
    setFormName(addr.name)
    setFormPhone(addr.phone)
    setFormFull(addr.full)
    setShowForm(true)
  }

  const handleSave = () => {
    if (!formTag || !formName || !formFull) {
      Toast.show({ content: '请填写完整信息' })
      return
    }
    const data = { tag: formTag, name: formName, phone: formPhone || '未填写', full: formFull }
    if (editingId) {
      updateAddress(editingId, data)
    } else {
      addAddress(data)
    }
    Toast.show({ icon: 'success', content: editingId ? '地址已更新' : '地址已添加' })
    setShowForm(false)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    removeAddress(deleteTarget.id)
    Toast.show({ content: '地址已删除' })
    setDeleteTarget(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', background: '#fff', borderBottom: '1px solid #eee',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div onClick={() => nav(-1)} style={{
            width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
          }}>‹</div>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>常用地址</span>
        </div>
        <span onClick={openAdd} style={{
          fontSize: 24, color: 'var(--c-accent)', cursor: 'pointer', lineHeight: 1, padding: '0 4px',
        }}>+</span>
      </div>

      {/* Address list */}
      <div style={{ padding: '12px' }}>
        {addresses.map(addr => (
          <div key={addr.id} style={{
            background: '#fff', borderRadius: 14, padding: '16px', marginBottom: 10,
            border: addr.isDefault ? '1.5px solid var(--c-accent)' : '1px solid #ddd',
          }}>
            {/* Tag + Default badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{
                padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                background: addr.tag === '家' ? 'rgba(227,97,123,0.1)' : addr.tag === '公司' ? 'rgba(44,138,158,0.1)' : 'rgba(22,163,74,0.1)',
                color: addr.tag === '家' ? 'var(--c-accent)' : addr.tag === '公司' ? '#2C8A9E' : '#16A34A',
              }}>{addr.tag}</span>
              {addr.isDefault && (
                <span style={{ fontSize: 10, color: 'var(--c-accent)', fontWeight: 500 }}>默认</span>
              )}
            </div>

            {/* Name + Phone */}
            <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 4 }}>
              {addr.name} <span style={{ fontSize: 13, fontWeight: 500, color: '#6a6a6a', marginLeft: 8 }}>{addr.phone}</span>
            </div>

            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 13, color: '#6a6a6a', lineHeight: 1.5 }}>
              <span style={{ marginTop: 1, flexShrink: 0 }}><MapPinIcon size={14} color="#929292" /></span>
              {addr.full}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 0, marginTop: 12, borderTop: '1px solid #f7f7f7', paddingTop: 10 }}>
              {!addr.isDefault && (
                <span onClick={() => setDefaultAddress(addr.id)} style={{
                  fontSize: 12, color: 'var(--c-accent)', cursor: 'pointer', fontWeight: 500,
                }}>设为默认</span>
              )}
              <span onClick={() => openEdit(addr)} style={{
                fontSize: 12, color: '#6a6a6a', cursor: 'pointer', fontWeight: 500,
                marginLeft: 16,
              }}>编辑</span>
              <span onClick={() => setDeleteTarget(addr)} style={{
                fontSize: 12, color: '#c13515', cursor: 'pointer', fontWeight: 500,
                marginLeft: 16,
              }}>删除</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Popup */}
      <Popup
        visible={showForm}
        onClose={() => setShowForm(false)}
        onMaskClick={() => setShowForm(false)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}
      >
        <div style={{ padding: '20px 16px 30px' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 16 }}>
            {editingId ? '编辑地址' : '新增地址'}
          </div>

          {/* Tag selector */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 8 }}>地址标签</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['家', '公司', '父母家', '其他'].map(t => (
                <span key={t} onClick={() => setFormTag(t)} style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  background: formTag === t ? 'var(--c-accent)' : '#f7f7f7',
                  color: formTag === t ? '#fff' : '#222',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Name */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 4 }}>收货人</div>
            <input value={formName} onChange={e => setFormName(e.target.value)}
              placeholder="姓名" style={{
                width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #ddd',
                fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }} />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 4 }}>电话</div>
            <input value={formPhone} onChange={e => setFormPhone(e.target.value)}
              placeholder="手机号" style={{
                width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #ddd',
                fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }} />
          </div>

          {/* Full address */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 4 }}>详细地址</div>
            <input value={formFull} onChange={e => setFormFull(e.target.value)}
              placeholder="省市区 + 街道 + 门牌号" style={{
                width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #ddd',
                fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }} />
          </div>

          <div onClick={handleSave} style={{
            padding: '14px', borderRadius: 12, background: 'var(--c-accent)',
            color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>
            {editingId ? '保存修改' : '添加地址'}
          </div>
        </div>
      </Popup>

      {/* Delete confirmation */}
      <Popup
        visible={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onMaskClick={() => setDeleteTarget(null)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}
      >
        <div style={{ padding: '24px 16px 30px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 4 }}>确认删除</div>
          <div style={{ fontSize: 14, color: '#6a6a6a', marginBottom: 8 }}>
            {deleteTarget?.tag ? `「${deleteTarget.tag}」` : ''} {deleteTarget?.full}
          </div>
          <div style={{ fontSize: 12, color: '#c13515', marginBottom: 20 }}>
            删除后将无法恢复
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div onClick={() => setDeleteTarget(null)} style={{
              flex: 1, padding: '14px', borderRadius: 12, textAlign: 'center',
              background: '#f7f7f7', color: '#6a6a6a', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>取消</div>
            <div onClick={confirmDelete} style={{
              flex: 1, padding: '14px', borderRadius: 12, textAlign: 'center',
              background: '#c13515', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>确认删除</div>
          </div>
        </div>
      </Popup>
    </div>
  )
}
