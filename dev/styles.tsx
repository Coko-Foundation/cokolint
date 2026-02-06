// import { get } from 'lodash'

import { styled, type RuleSet, css } from 'styled-components'

export const Styles = styled.div`
  /* background: maroon !important; */

  /* border: 1px solid blue; */
  border: 1px solid green;

  color: ${(props): string => props.theme.colorText};

  outline: ${(props: { active: boolean }): RuleSet | null => {
    const isActive = props.active
    if (!isActive) return null
    return css`
      background: magenta;
    `
  }};

  &:hover {
    p {
      color: white;
    }

    span {
      color: white;
    }

    background: green;
  }

  content: ' ';

  margin-top: 1px;
  margin-bottom: 2px;
  margin-left: 3px;
  /* margin-right: 4px; */

  /* padding: 1px 1px 1px 1px; */

  /* box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.07); */
  box-shadow: inset 0 0 4px rgb(0 0 0 / 7%);
`
