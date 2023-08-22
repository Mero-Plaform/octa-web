import { DBUtilsFacade } from '../../../../../DB/DBUtilsFacade.js';

/* -------------------------------------------------------------------------- */
/*                                  transfer                                  */
/* -------------------------------------------------------------------------- */

export const exportAppData = async () => {
  const data = await DBUtilsFacade.exportAppDBData();
  const downloadLink = document.createElement("a");
  downloadLink.download = "UserData.octa";
  downloadLink.href = URL.createObjectURL(data);
  downloadLink.click();
};
