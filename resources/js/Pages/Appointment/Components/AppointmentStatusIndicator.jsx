const STATUS_STYLE = {
    started:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const STATUS_TEXT = {
    started: "Iniciada",
    completed: "Finalizada",
    cancelled: "Cancelada",
};
export default function AppointmentStatusIndicator({ statusText }) {
    const classStyle = STATUS_STYLE[statusText];
    return (
        <span
            className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${classStyle}`}
        >
            {STATUS_TEXT[statusText].toUpperCase()}
        </span>
    );
}
