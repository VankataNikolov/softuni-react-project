function FormHeader({
    title,
    errorMessage
}) {
    return (
        <div style={{ textAlign: 'center' }}>
            <h3>{title}</h3>
            <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
    );
}

export default FormHeader;