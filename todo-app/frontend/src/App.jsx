import './App.css';
import Modal from './components/Modal';
import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", category: "", dueDate: "" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => setTasks((await api.get("/tasks")).data);
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required");
    try {
      if (editingId) await api.put(`/tasks/${editingId}`, form);
      else await api.post("/tasks", form);
      setForm({ title: "", description: "", category: "", dueDate: "" });
      setEditingId(null);
      load();
    } catch (err) { alert(err.response?.data?.error || "Error"); }
  };

  const toggle = async (t) => {
    if (t.completed) return alert("Already completed");
    await api.put(`/tasks/${t._id}`, { completed: true });
    load();
  };

  const remove = async (id) => { await api.delete(`/tasks/${id}`); load(); };

  const startEdit = (t) => {
    setEditingId(t._id);
    setForm({ title: t.title, description: t.description, category: t.category, dueDate: t.dueDate?.slice(0,10) || "" });
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Tasks</h1>
      <form onSubmit={submit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <button>{editingId ? "Update" : "Add"}</button>
      </form>
      <ul>
        {tasks.map((t) => (
          <li key={t._id} style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            <input type="checkbox" checked={t.completed} onChange={() => toggle(t)} />
            <strong>{t.title}</strong> — {t.category} {t.dueDate && `(due ${t.dueDate.slice(0,10)})`}
            <button onClick={() => startEdit(t)}>Edit</button>
            <button onClick={() => remove(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

