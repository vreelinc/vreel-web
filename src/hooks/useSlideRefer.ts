import { useQuery } from '@apollo/client';
import { GET_USER_BY_USER_NAME } from '@graphql/query';

export const useSlideRefer = () => {
  const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: {
      username: 'bofa',
    },
    fetchPolicy: 'cache-and-network',
  });

  const getSlidesData = () => {
    const sectionsData = [];
    let slidesContent = [],
      link: { name: string; id: string } = { name: '', id: '' };

    const username = data?.username?.username;

    if (data) {
      const { elements, slides } = data?.username?.vreel;
      const sections = Object.entries({ slides, ...elements }).filter(
        (e) => e[1] != null && e[0] != '__typename'
      );

      slidesContent = slides
        .map((item: any) => item)
        .sort((a: any, b: any) => {
          return a.slide_location - b.slide_location;
        });

      if (sections) {
        sections.forEach((e) => {
          let name: string, id: string;
          if (e[0] === 'slides') {
            name = 'slide';
            id = e[1][0].id;
          } else {
            (name = e[0]), (id = e[0]);
          }
          sectionsData.push({ ...link, name, id });
        });
      }
    }
    return {
      sectionsData,
      username,
      slidesContent,
    };
  };

  return {
    data,
    getSlidesData,
  };
};
