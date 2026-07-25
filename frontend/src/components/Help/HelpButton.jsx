import "./GuideModal.css";

export default function HelpButton({
    onClick,
}) {

    return (

        <button
            className="help-button"
            onClick={onClick}
            title="Open Editor Guide"
        >


            <span className="help-text">
                💡Need Help ?
            </span>

        </button>

    );

}