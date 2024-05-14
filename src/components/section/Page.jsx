/*메인 페이지를 제외한 구성 페이지입니다
- 지역축제/전통시장(사진 데이터용)
- Footer 는 필요한 페이지마다 적어야함 */

import Header from './Header-Footer/Header';
import Search from '../page/Search';
import Contents from '../page/Contents';



const Page = () => {

    return (
    <>
        <Header />
          <Search />

    </>
    )
}

export default Page;