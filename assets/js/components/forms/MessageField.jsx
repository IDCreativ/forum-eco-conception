import React from "react";

const MessageField = ({
	name,
	label,
	value,
	onChange,
	placeholder = "",
	type = "text",
	error = "",
}) => (
		<input
			value={value}
			onChange={onChange}
			type={type}
			placeholder={placeholder || label}
			name={name}
			id={name}
			className={"form-control" + (error && " is-invalid")}
		/>
);

export default MessageField;
