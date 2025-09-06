type ButtonProps = {
    label: string;
    style: string
};

const Button = ({label, style}: ButtonProps) => {
    return (
        <button className={style}>
            {label}
        </button>
    )
}

export default Button;