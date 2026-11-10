"use client";
import { useEffect } from "react";
export default function AuthStyles() {
  useEffect(() => {
    const id = "islam-origin-auth-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      .auth-page{min-height:calc(100svh - 76px);display:grid;place-items:center;padding:40px 16px;background:radial-gradient(ellipse at 50% 0%,#f1e5c8,transparent 55%),#fffefa}
      .auth-card{width:min(100%,470px);padding:clamp(24px,5vw,42px);border:1px solid rgba(181,139,59,.3);border-radius:24px;background:#fff;box-shadow:0 20px 60px #30271912;color:#252a33}
      .auth-brand{display:flex;align-items:center;gap:10px;color:#252a33}.auth-brand span{display:grid;place-items:center;width:40px;height:40px;border:1px solid #b58b3b;border-radius:13px;background:#f5eddc;color:#8f6a25;font-size:24px}
      .auth-eyebrow{margin:28px 0 5px;color:#98732f;font-size:.72rem;font-weight:800;letter-spacing:2px}.auth-card h1{margin:0;font-size:2.1rem;letter-spacing:-1px}.auth-intro{color:#66707d;font-size:.92rem;line-height:1.7}
      .auth-tabs{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:5px;background:#f5f1e8;border-radius:12px;margin:24px 0}
      .auth-tabs button{border:0;border-radius:9px;padding:10px;background:transparent;color:#59616c;font-weight:700}.auth-tabs button.active{background:#fff;color:#8f6a25;box-shadow:0 2px 8px #0000000c}
      .auth-form{display:grid;gap:17px}.auth-form label{display:grid;gap:7px;color:#424956;font-size:.85rem;font-weight:700}.auth-form input{width:100%;min-width:0;padding:13px 14px;border:1px solid #ddd4c2;border-radius:11px;background:#fffefa;color:#252a33;font:inherit;outline:none}.auth-form input:focus{border-color:#b58b3b;box-shadow:0 0 0 3px #b58b3b20}
      .auth-password{display:flex;gap:8px}.auth-password button{border:1px solid #ddd4c2;border-radius:10px;background:#fffefa;color:#8f6a25;padding:0 10px;font-size:.76rem}
      .auth-submit{width:100%;padding:14px;border:0;border-radius:999px;background:linear-gradient(135deg,#e7cf9b,#c39a4b);color:#29251e;font-weight:800}.auth-submit:disabled{opacity:.6}
      .auth-error,.auth-success{padding:11px 13px;border-radius:10px;font-size:.82rem}.auth-error{background:#fff0ed;color:#9c2d20}.auth-success{background:#edf8ef;color:#23653a}
      .auth-links{display:grid;gap:14px;margin-top:20px;text-align:center;font-size:.85rem}.auth-links p{margin:0;color:#66707d}.auth-links button{border:0;background:transparent;color:#8f6a25;font-weight:700}.auth-legal{margin:25px 0 0;text-align:center;color:#89919b;font-size:.72rem}.auth-loading{min-height:100svh;display:grid;place-items:center;background:#fffefa;color:#8f6a25;font-weight:800}
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);
  return null;
}
