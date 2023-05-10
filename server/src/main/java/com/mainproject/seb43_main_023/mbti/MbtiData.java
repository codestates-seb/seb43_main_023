package com.mainproject.seb43_main_023.mbti;

import com.mainproject.seb43_main_023.mbti.entity.Mbti;
import com.mainproject.seb43_main_023.mbti.repository.MbtiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

@Component
public class MbtiData {
    @Autowired
    private MbtiRepository mbtiRepository;

    @PostConstruct
    public void init(){
        List<Mbti> mbti = Arrays.asList(
                new Mbti("ISTP","https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMTg1/MDAxNjI1NjQzNzIxNDQz.EfMyjRXUfV1VGRgNszd7a5cVwIDZp9WpZHEzyEC5RJEg.MbHWLTvaIE-96grTDv661p7bK-xyaHpaRmdVBLMTIxog.PNG.im_worry/13.png?type=w800","울릉도, 독도","먹고 놀고 휴식하기 등 동시에 다양한 니즈를 만족시킬 수 있는 여행지를 선호하는\\nESTP에게 어울리는 울릉도는 어떠신가요?","https://m.segye.com/content/image/2021/06/16/20210616515482.jpg"),
                new Mbti("ISTJ","https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMTAx/MDAxNjI1NjQzNzMxNjcz.VRNdIWkBVdxoiU8K67Ea3SDmZkk2MTPIvUR7cE-qHWUg.jGP1Wtzs1-O4GiFeX-6RRodA25OgjRWemvcWeyR8jwsg.PNG.im_worry/9.png?type=w800","경주 역사지구","계획적으로 움직이며 꼼꼼하게 여행지에 대해 공부해가는\\nISTJ에게 어울리는 경주는 어떠신가요?","https://t1.daumcdn.net/cfile/tistory/1663884050218C690B"),
                new Mbti("ISFJ","https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMTE2/MDAxNjI1NjQzNzMxNjcz.-fCJ7FzEwIE4Y24rzoSn641sdAe3WAoewHAoUJWd6Tog.JjqTenmJW-iu_PIhenanymzwOMBKBwpRkiTHsjJIsZEg.PNG.im_worry/10.png?type=w800","전주 한옥마을","계획적으로 움직이며 동행을 챙기는 스타일의\\nISFJ에게 어울리는 전주는 어떠신가요?","https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/3nyp/image/7QuKqsLRQEHPZtZEscAu1BIgP-A.jpg"),
                new Mbti("ISFP","https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMTgx/MDAxNjI1NjQzNzIxNDQ0.JLqeJ_sdkWyRkQ-Qjnu2xW163wBZmTmqAVyDBZy9UY4g.fCQwooYzAOjReoeF7OpgKArcB50ucPd2fmUmd0Rob5Ag.PNG.im_worry/14.png?type=w800","단양 패러글라이딩","새로운 것을 시도할 준비가 된 예술가 타입의\\nISFP에게 어울리는 단양은 어떠신가요?","https://t1.daumcdn.net/cfile/tistory/99B5C24760169F9B14"),
                new Mbti("INFJ", "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMjU3/MDAxNjI1NjQzNzI2ODgw.4SALKzLC-iLP3PvUs3bDFlijYO-VfVewp1c7tbrP4qcg.JWMyIWCXSJn_aKSXOAJtwb1Wi9w-TnwZ3peJU6YR9m4g.PNG.im_worry/5.png?type=w800","전북 완주","새로운 사람과 스스럼없이 어울리지만, 사실 혼자만의 시간을 중요하게 여기는\\nINFJ에게 어울리는 완주는 어떠신가요?","https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/16/4df4704c-519f-4423-bc7f-9d1cb84c6306.jpg"),
                new Mbti("INTJ", "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfNTIg/MDAxNjI1NjQzNzM1NTU1.DRC1y3aKuWfnC4iX9jVlyrvIeetgzoQNFnIsmFk-i_Eg.AB4YvmMQwFIgbCbdDdZmVMn3-Sy0uGJi-5sHNHTqCKAg.PNG.im_worry/1.png?type=w800","경남 고성","철두철미하게 미리 계획을 세우며 깊고 넓은 지식을 쌓는 데 즐거움을 느끼는\\nINTJ에게 어울리는 고성은 어떠신가요?","https://www.tynewspaper.co.kr/news/photo/202109/20700_30799_1011.jpg"),
                new Mbti("INFP","https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMjM0/MDAxNjI1NjQ0NjI5NTY3.rlzSM3ygwZk6ek5eDDGsks7b5XMwTIlCtorqMN31BQog.TtsCtPN8_6wM5cTGohIR66xJahiVhyZJeS5hhdJe7-gg.PNG.im_worry/6_INFP.png?type=w800","지리산 종주 코스","높은 인내심으로 고난이도 여행지도 소화하기 충분한\\nINFP에게 어울리는 지리산은 어떠신가요?","https://www.gurye.go.kr/images/homepage/site/tour/content/img_trip2021_06.jpg"),
                new Mbti("INTP",
                        "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfNDQg/MDAxNjI1NjQzNzM1NTYy.7874_AbJesFqYqRYDZWk8vDwBzouE5jTinKio9IZlwog.lYSIMWtpn11wskZop5LuYHBtvPMLIPrudW3JP4f_XOsg.PNG.im_worry/2.png?type=w800",
                        "담양 죽녹원",
                        "무언가 생각할 수 있게 하는 여행지에서 철학과 사색을 즐기는\\nINTP에게 어울리는 담양은 어떠신가요?",
                        "https://i.namu.wiki/i/EYhJp9dQkmnDD2X7LEGAH6SObXW3zFiKc6C1kRfWwQZI2UuvNpgTYZyKKmKOTgipFhU4Csj-bfOGVND_sORHsg.jpg"),
                new Mbti("ESTP",
                        "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMTAw/MDAxNjI1NjQzNzIxNDQ2.qzMxAy7U89cSPAmR-rRtvWz9KOwLOq8udCA4xyLWIeQg.EpFVcpYP71bHhA5DLV0QohpnanSnwnbRfNdgkShNI5Ag.PNG.im_worry/15.png?type=w800",
                        "제주도",
                        "먹고 놀고 휴식하기 등 동시에 다양한 니즈를 만족시킬 수 있는 여행지를 선호하는\\nESTP에게 어울리는 제주도는 어떠신가요?",
                        "https://t1.daumcdn.net/cfile/tistory/99929A4A5BBB222519"),
                new Mbti("ESFP",
                        "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMTQz/MDAxNjI1NjQzNzIxNDQ2.zdpdRNd0a9KecI7HNpaOzOdJ8yczPl4cQ5MCWRDFbNEg.xkgASe6FXe6D5bROTW3VTWO90wVWk3F53bClvjuggoAg.PNG.im_worry/16.png?type=w800",
                        "강릉 세인트존스 거품파티",
                        "즉흥적인 즐거움을 추구하며 스포트라이트를 즐기는\\nESFP에게 어울리는 강릉은 어떠신가요?",
                        "https://img.hotelnjoy.com/picture/HGW_GR7137/202005271126100.jpg"),
                new Mbti("ESTJ",
                        "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMTc2/MDAxNjI1NjQzNzMxNjc1.DaXA4vqnPIjmDvcANoUHnEfP1JetbFzzSDA10lVXjWAg._ko2eUVqkotGme2fnfDJRlIA6rSsH4BpOJnR8-BbNukg.PNG.im_worry/11.png?type=w800",
                        "서울",
                        "호불호가 확실하고 깔끔하게 짜여지는 여행 스타일을 선호하는\\nESTJ에게 어울리는 서울은 어떠신가요?",
                        "https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/POXFD4IJRX4FSNSQGDYS5LRDHQ.jpg"),
                new Mbti("ESFJ",
                        "https://a.cdn-hotels.com/gdcs/production102/d390/e4e76e16-ba3e-4ce6-8f97-d78d840bbc50.jpg",
                        "전남 여수",
                        "체력을 소모하는 여행보다는 여행 코스를 짜기 명확하고 쉬운 여행지를 선호하는\\nESFJ에게 어울리는 여수는 어떠신가요?",
                        "https://m.segye.com/content/image/2021/06/16/20210616515482.jpg"),
                new Mbti("ENFP",
                        "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMTUw/MDAxNjI1NjQzNzI2ODg1.L-DchchvLkF9L9zcR9x7QqcUqmjHPh5Gt9g9iAaQrdog.deaDOAh1s39e11QIFDubPUHF77alwRuSDMALvcBx3tMg.PNG.im_worry/8.png?type=w800",
                        "강원도 양양",
                        "사람들과 어울리기를 좋아하는 인싸! 에너자이저 스타일의\\nENFP에게 어울리는 양양은 어떠신가요?",
                        "https://t1.daumcdn.net/cfile/tistory/99CC584E5B75287936"),
                new Mbti("ENTP",
                        "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMjk4/MDAxNjI1NjQzNzM1NTY0.EMxwFt8BJlyxhLtYKL41nqw9FuN5Nz4OthaCRgw2_Vsg.wRhGFl1hEh6F7JqzjkUQOdmICqbnvjPqMAWnkMlh0kwg.PNG.im_worry/4.png?type=w800",
                        "부산",
                        "느긋하고 관대하며, 위기 상황에서 판단을 잘하고 선입견이 없는\\nENTP에게 어울리는 부산은 어떠신가요?",
                        "https://www.bsmeditour.go.kr/img/sub/img_intro_busan.jpg"),
                new Mbti("ENFJ",
                        "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MTRfMTA2/MDAxNjI2MjQ0NDkxMjMx.Ab1QoIy8o3iJBGoQId7Fruva1cMOMhCH6dMzyozzyWgg.KsGp36krkXzmwaEi6WwEy7TGKmFPOTW7i0xw8xzXJisg.PNG.im_worry/7_ENFJ.png?type=w800",
                        "속초 중앙 시장",
                        "사람을 좋아해 소통하는 여행을 추구하는\\nENFJ에게 어울리는 속초는 어떠신가요?",
                        "https://post-phinf.pstatic.net/MjAyMTA5MTdfMTE0/MDAxNjMxODUxMjY3OTc0.Kk8fva50ga9LkRZDL_iKisfHpR-aJd2ghR9vpHgoRcIg.5jnyJg0xClAkFGpR9S8v5iPNS67G4hZ-veL0aHA6bfQg.JPEG/%EC%86%8D%EC%B4%88-%EC%86%8D%EC%B4%88%EC%82%B4%EC%9D%B4-%EC%B2%AD%EC%A0%95%EC%A7%80%EC%97%AD%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B3%A0%EA%B5%AC%EB%A7%88%EC%8C%80%EB%A1%B1-%EC%A0%95%EC%B1%85-%EC%A0%95%EC%B1%85%EC%A3%BC%EA%B0%84%EC%A7%80%EA%B3%B5.jpg?type=w1200"),
                new Mbti("ENTJ",
                        "https://mblogthumb-phinf.pstatic.net/MjAyMTA3MDdfMjk4/MDAxNjI1NjQzNzM1NTY0.N3UM1sVKMyNXTav-dRBXnGHe7FYMJpAA1h_Ko8NvFrgg.Y1fST4Lphu6ypeTYQKIDoihjp4-gJSILP0SqZdDnUxcg.PNG.im_worry/3.png?type=w800",
                        "서산, 당진",
                        "동행 중 리더 격으로 여행을 이끌며 효율적인 여행을 이끌어내는\\nENTJ에게 어울리는 서산은 어떠신가요?",
                        "https://mblogthumb-phinf.pstatic.net/MjAxNzA3MDRfMTU3/MDAxNDk5MTc3OTI3MDc0.gEEnyDdULsO_ThcNSYuBTeHXP314EtaeWNOyAnRwO1Eg.M4sl07gsbI00JtzspkQcpr-7OjiA8TD3Kbpxw_IzDIgg.JPEG.awalt/DSC_9824.jpg?type=w800")
        );
        mbtiRepository.saveAll(mbti);
    }
}
