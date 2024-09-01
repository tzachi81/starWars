// import styles from './Results.module.css';

interface IResultsProps {
    title: string,
    data: any[]
}

export const CategoryCard: React.FC<IResultsProps> = ({ title, data }) => {

    return <div>
        <h4>{title}</h4>
        {
            data.map((result: any, index: number) => {
                return (
                    <li
                        key={`${result.name}_${index}`}>
                        {result.name}
                    </li>
                )
            })
        }
        <button onClick={() => console.log(`Go to ${title} page`)}>View All</button>
    </div>
}
