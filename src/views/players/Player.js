import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApiEndPoints } from '../../constants/ApiEndPoints';
import { Button } from 'primereact/button';
import Layout from '../../components/layout/Layout';
import PlayerCard from '../../components/PlayerCard';
import { ScrollTop } from 'primereact/scrolltop';
import { fetchPlayerList } from '../../features/players/playerAPI';

const Player = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const {
    data: { data },
  } = useSelector((state) => state.player);
  const { loading } = useSelector(({ system }) => system);

  const fetchData = () => {
    dispatch(
      fetchPlayerList({
        url: `${ApiEndPoints.playerList}?page=${1}&&per_page=${limit}`,
      })
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const loadMore = () => {
    setLimit((preState) => preState + 10);
  };

  return (
    <Layout>
      <h2 className='flex justify-content-center mb-4 mt-4'>Player List</h2>
      {data?.data.map((player) => (
        <PlayerCard
          key={player.id}
          title={`${player.first_name} ${player.last_name}`}
          position={player?.position || 'N/A'}
          city={player?.team?.city || 'N/A'}
          division={player?.team?.division || 'N/A'}
        />
      ))}
      <Button
        className='mt-2 mb-5 w-full'
        loading={loading}
        label='Load More'
        onClick={loadMore}
      />
      <ScrollTop
      // target='parent'
      // threshold={100}
      // className='w-2rem h-2rem border-round bg-primary'
      // icon='pi pi-arrow-up text-base'
      />
    </Layout>
  );
};

export default Player;
