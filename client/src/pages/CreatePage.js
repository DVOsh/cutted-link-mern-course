import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hooks";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const CreatePage = () => {
	const auth = useContext(AuthContext);
	const { request } = useHttp();
	const [link, setLink] = useState('');
	const navigate = useNavigate();

	const pressHandler = async event => {
		if (event.key === 'Enter') {
			try {
				const data = await request('/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}` });
				navigate(`/detail/${data.link._id}`);
			} catch (e) { }
		}
	}

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
				<div className="input-field">
					<input placeholder="Вставьте ссылку"
						id="link"
						type="text"
						value={link}
						onChange={e => setLink(e.target.value)}
						onKeyPress={pressHandler} />
					<label htmlFor="link">Ссылка</label>
				</div>
			</div>
		</div>
	)
}