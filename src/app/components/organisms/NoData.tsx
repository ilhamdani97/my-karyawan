export interface INoDataProps {
}

export default function NoData (props: INoDataProps) {
  return (
    <div className="flex flex-row justify-center w-full mt-16 mb-8 bg-white p-">
        <div className={'flex flex-col justify-center items-center'}>
            <img
            src={`/img/empty-data.png`}
            alt="card-image"
            className="rounded-sm h-40"
        />
        <h5 className="mt-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{'Data is Empty'}</h5>
        </div>
    </div>
  );
}
