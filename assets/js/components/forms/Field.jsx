import React from "react";

const Field = ({
	icon,
	name,
	label,
	value,
	onChange,
	placeholder = "",
	type = "text",
	error = "",
}) => (
	<div className="form-group mb-3">
		{label && <label htmlFor={name}>{label}</label>}
		<div className="input-group">
			{icon && <span className="input-group-text"><i className={"far " + icon}></i></span>}
			<input
				value={value}
				onChange={onChange}
				type={type}
				placeholder={placeholder || label}
				name={name}
				id={name}
				className={"form-control" + (error && " is-invalid")}
			/>
		</div>
		{error && <p className="invalid-feedback">{error}</p>}
	</div>
);

export default Field;
