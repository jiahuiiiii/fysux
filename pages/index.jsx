import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import students from '../assets/students.json';

function Index() {
  const [filterStudents, setFilterStudents] = useState([]);
  const [query, setQuery] = useState('');
  let timeout = null;

  useEffect(() => {
    setFilterStudents(query === '' ? [] : students.filter((stu) => stu.join().toLowerCase().includes(query.toLowerCase())));
  }, [query]);

  return (
    <div className="">
      <div className="px-10 flex items-center bg-zinc-100 w-full h-screen flex-col">
        <div className="text-xl mt-32  text-zinc-600">新山宽柔中学</div>
        <div className="text-4xl mt-4 font-['MiSans'] font-light text-zinc-700">学生资料查询系统</div>
        <input
          type="text"
          onChange={(event) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              setQuery(event.target.value);
            }, 500);
          }}
          className="w-3/5 border-2 border-zinc-700  p-4 mt-10"
          placeholder="输入学号、班级、中文姓名或英文姓名进行查询"
        />
        {filterStudents ? (
          <div className="mt-6 overflow-x-hidden overflow-y-auto w-3/5">
            {filterStudents.map((person) => (
              <Link
                href="/student/[id]"
                as={`/student/${person[0]}`}
              >
                <div className="p-4 flex items-center gap-4 justify-between hover:bg-neutral-200">
                  <div className="flex flex-row gap-5 items-center">
                    <div className="tabular-nums">{person[0]}</div>
                    <div>{person[1]}</div>
                    <div>{person[2]}</div>
                  </div>
                  <div>{person[3]}</div>
                </div>

              </Link>
            ))}
          </div>
        ) : (<div />)}
      </div>
    </div>
  );
}

export default Index;
