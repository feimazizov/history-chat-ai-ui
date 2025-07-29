export default function StopMessage({ count }: { count: number }) {
    return (<div>
        
        {
            count > 5 &&
            <>Stop!</>
        }
        {
            count < 5 &&
            <>Go on!</>
        }
    </div>)
}