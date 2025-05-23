import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		// const res = await fetch("http://localhost:8485/api/admin/login", {
		const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, password }),
		});

		if (res.ok) {
			const data = await res.json();
			localStorage.setItem("jwt_token", data.token);
			alert("로그인 성공");
			navigate("/jwt-test");
			// window.location.href = "/jwt-test";
			// TODO: 로그인 후 이동할 페이지로 redirect
		} else {
			setError("로그인 실패: 아이디 또는 비밀번호 오류");
		}
	};

	return (
		<section id="starter-section" className="starter-section section">
			
			<div className="container" data-aos="fade-up">
				<form onSubmit={handleLogin} >
					<div style={{ justifyContent: 'center',display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
					<input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID"/>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
					<button className="round-button" type="submit">로그인</button>
					</div>
				</form>
				{error && <p style={{ color: "red" }}>{error}</p>}
			</div>
		</section>
	);
}

export default LoginForm;
