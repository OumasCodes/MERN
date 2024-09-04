import React from "react";

import PlacesList from "../components/PlacesList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Tokyo",
    description:
      "Tokyo, is the capital of Japan and one of the most populous cities in the world, with a population of over 14 million residents as of 2023 and the second-most-populated capital in the world. The Greater Tokyo Area, which includes Tokyo and parts of six neighboring prefectures, is the most-populous metropolitan area in the world, with 41 million residents as of 2024.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/432px-Skyscrapers_of_Shinjuku_2009_January.jpg",
    address: "1-1 Chiyoda, Chiyoda City, Tokyo 100-8111, Japan",
    coordinates: { lat: 35.6823383, lng: 139.7572169 },
    userId: "u1",
  },

  {
    id: "p2",
    title: "Hanoi Opera House",
    description:
      "The Hanoi Opera House, or the Grand Opera House is an opera house in central Hanoi, Vietnam. It was erected by the French colonial administration between 1901 and 1911. Hanoi Opera House is one of three opera houses that the French built during their time in Indochina, the others are Haiphong Opera House and Municipal Theatre in Ho Chi Minh city.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hanoi_Opera_House%2C_24_December_2016.jpg/368px-Hanoi_Opera_House%2C_24_December_2016.jpg",
    address: "1 Tràng Tiền, Phan Chu Trinh, Hoàn Kiếm, Hà Nội, Vietnam",
    coordinates: { lat: 21.0243242, lng: 105.8318922 },
    userId: "u2",
  },

  {
    id: "p3",
    title: "Canada Palace",
    description:
      "Canada Place, co-named Komagata Maru Place, is a building situated on the Burrard Inlet in Vancouver, British Columbia, Canada. It is home to the Vancouver Convention Centre, the Pan Pacific Vancouver Hotel, the Vancouver World Trade Centre, and the virtual flight experience Flyover in Vancouver",
    image: "https://lh5.googleusercontent.com/p/AF1QipOxgQBJdl2Nxk137ZaPqQH3rO8BuH7WmMr5_-Xt=w408-h306-k-no",
    address: "9700 Jasper Ave, Edmonton, AB T5J 4C1, Canada",
    coordinates: { lat: 53.5426424, lng: -113.4892237 },
    userId: "u3",
  },
  {
    id: "p4",
    title: "Palais de Justice de Paris",
    description:
      "The Palais de Justice, is a judicial center and courthouse in Paris, located on the Île de la Cité. It contains the Court of Appeal of Paris, the busiest appellate court in France, and France's highest court for ordinary cases, the Court of Cassation",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Palais_de_Justice_%28Paris%29_June_2010.jpg",
    address: "08 Bd du Palais, 75001 Paris, France",
    coordinates: { lat: 48.8557234, lng: 2.3451467 },
    userId: "u1",
  },
  {
    id: "p5",
    title: "New World Trade Tower",
    description:
      "The benchmark for high-end office buildings in Wuhan.The US Consulate General, the French Consulate General, the Dutch and Australian trading companies, the Hong Kong Special Administrative Region Trade Office, Deloitte, Cushman & Wakefield and other established embassies and offices, as well as Japanese companies such as Nikon, Canon, Toshiba, etc. The K11 level of the toilet in this office building is much better than the new world department store downstairs. I can't believe it is owned by the same family. North-facing windows offer views of Northwest Lake Park, south facing Xinhua Road, Jiefang Avenue, Zhongshan Park, Wushang Henglong landscape, very beautiful at night.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/%E5%9B%BD%E8%B4%B8%E5%BB%BA%E7%AD%91%E7%BE%A4.jpg/375px-%E5%9B%BD%E8%B4%B8%E5%BB%BA%E7%AD%91%E7%BE%A4.jpg",
    address: "568 Jianshe Blvd, 西北湖 Jianghan District, Wuhan, Hubei, China, 430022",
    coordinates: { lat: 30.595124, lng: 114.270037 },
    userId: "u2",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const filteredPlaces = DUMMY_PLACES.filter((place) => place.userId === userId);
  return <PlacesList items={filteredPlaces} />;
};

export default UserPlaces;
