import styled from "styled-components";

export const StyledMeios = styled.div`
    background-color: white;
    border-radius: 1.2rem;
    border: lightgray 1px solid;
    padding: 0.5rem;
    height: 3rem;
    width: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    & a {
        font-size: 1.25rem;
        font-weight: bold;
        color: black;
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    svg {
        flex-shrink: 0;
    }
`;
