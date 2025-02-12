import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif ;
}

html {
  /* 1rem = 10px */
  font-size: 62.5%;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

html::-webkit-scrollbar{
 height: 50px;
 width: 0px;
 color: #d6dbdf;
}

body {
  overflow-x: hidden;
}

h1,
h2,
h3,
h4 {
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 5.5rem;
  font-weight: 600;
}

 h2 {
   font-size: 3.5rem;
   font-weight: 400;
   white-space: normal;
  
  }

h3 {
  font-size: 1.8rem;
  font-weight: 300;
}

a {
  text-decoration: none;
}
li {
  list-style: none;
}

p{
  font-size: 1.7rem;
  color: gray;
}


@media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
       html {
      font-size: 50%;
    }

}

@media (max-width: ${({ theme }) => theme.media.tab_screen}) {
    html{
        font-size:60%;
    }
  }
`;
