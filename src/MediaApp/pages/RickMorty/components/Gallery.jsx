import { Profile } from './Profile';
import { Button } from 'react-bootstrap';

export const Gallery = ({ data, setInfoCharater, updateData, category }) => {
  return (
    <div>
      <div className="d-flex gap-5">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          List of {category}
        </h2>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-3 py-2">
        {data?.results.map((e) => {
          return (
            <Profile key={e.id} elem={e} setInfoCharater={setInfoCharater} />
          );
        })}
      </div>

      <div className="gap-2 d-flex">
        {data?.info.prev && (
          <Button
            onClick={() => updateData(data.info.prev)}
            className="bg-gradient-to-br from-green-400 to-blue-500 text-white rounded-lg p-6 shadow-lg"
          >
            Previous
          </Button>
        )}

        {data?.info.next && (
          <Button
            onClick={() => updateData(data.info.next)}
            className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white rounded-lg p-6 shadow-lg"
          >
            Next Pag
          </Button>
        )}
      </div>
    </div>
  );
};
