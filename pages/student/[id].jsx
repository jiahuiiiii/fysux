import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function StudentData() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/fetch/${id}`)
        .then((res) => res.json())
        .then((res) => setData(res));
    }
  }, [id]);

  return (
    <div>
      <div>{id}</div>
    </div>
  );
}

export default StudentData;
