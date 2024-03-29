import styled from "styled-components";

export const StyledBackgroundTheme = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
  transition: background-color 0.5s linear;
  width: 100vw;
  background-color: ${(props) => props.$bg};
`;
export const StyledColorPalette = styled.div`
  text-align: center;
`;
export const StyledColor = styled.li`
  list-style: none;
  border: 3px solid black;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.5s ease;
  background-color: ${(props) => props.children};
  opacity: 1;
  &:hover {
    opacity: 0.5;
  }
`;
export const StyledColorsList = styled.ul`
  padding: 20px 0;
  display: flex;
  gap: 10px;
`;
