import React, { FC, useEffect } from 'react';

import { useRouter } from 'next/router';

const Search: FC = () => {


  const router = useRouter();

  useEffect(() => {
    const searchEle = document.getElementById('search') as HTMLInputElement;
    const execSearch = () => {
      const value = searchEle.value;
      const items = document.getElementsByClassName('mirror-item');
      Array.from(items).forEach(item=>{
        const txt = item.firstChild.textContent;

        if (txt.indexOf(value) === -1) {
          item.classList.add('hide');
        } else {
          item.classList.remove('hide');
        }
      });
    };

    router.events.on('routeChangeComplete', ()=>{
      searchEle.value = '';
    });

    searchEle.addEventListener('input', execSearch);
  }, []);

  return (<>
    <hr/>
    <input className="input is-info" id="search" type="text" placeholder="搜索镜像" />
    <hr/>
  </>);
};

export default Search;
