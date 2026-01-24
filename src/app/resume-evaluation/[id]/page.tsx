import Main from '@/components/EvaluationResult/Main';

interface ResultPageProps {
    params: Promise<{
        id: string
    }>
}

export default function evaluationResult({ params }: ResultPageProps) {
    return (
        <>
            <Main params={params} />
        </>
    );
}