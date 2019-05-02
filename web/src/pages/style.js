import styled from 'styled-components';

export default styled.div`
  p {
    white-space: pre-line;
  }
  .font-size-buttons {
    position: fixed;
    bottom: 15px;
    right: 15px;
    > button:nth-of-type(1) {
      margin-right: 5px;
    }
  }
`;
