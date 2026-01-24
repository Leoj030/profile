import Result from "./Result";

interface ResultPageProps {
    params: Promise<{
        id: string
    }>
}

export default function Main({ params }: ResultPageProps) {
    return (
        <main className="flex-1">
            <Result params={params} />
        </main>
    );
}