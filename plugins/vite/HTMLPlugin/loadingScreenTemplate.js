/* -------------------------------------------------------------------------- */
/*                              used in web build                             */
/* -------------------------------------------------------------------------- */

export const loadingScreenTemplate = `
  <style id="appEntryLoadingScreenStyles">
    @keyframes scaleAnim {
      to {
        transform: scale(1.5);
      }
    }

    .openLoadingScreen {
      animation: 1s openAnim forwards;
    }

    @keyframes openAnim {
      to {
        transform: translateY(-100%);
      }
    }
  </style>

  <div 
    id="appEntryLoadingScreen"
    style="
      height:100%; 
      width:100%; 
      display:flex; 
      position: absolute;
      z-index: 9999;
      background-color: #cfd5dc;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      transition: 1s;
      pointer-events:none;
    "
  > 
    <img
      style="
        height:30vmin;   
        max-height:100px;
        animation: 0.7s scaleAnim infinite alternate;
      " 
      src="./appIcon.svg" 
      alt="octa icon"
    />
  </div>
`;
