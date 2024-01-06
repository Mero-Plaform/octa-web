import { DBUtilsFacade } from '../../../../../DB/DBUtilsFacade.js';
import { saveIdleModeCountdownStore } from "../../../stores/idleModeSettings/idleModeCountdownStore.js";

/* -------------------------------------------------------------------------- */
/*                                  transfer                                  */
/* -------------------------------------------------------------------------- */

export const exportAppData = async () => {

  // saving current timer data to DB before export
  saveIdleModeCountdownStore();
  const data = await DBUtilsFacade.exportAppDBData();
  const downloadLink = document.createElement("a");
  downloadLink.download = "UserData.octa";
  downloadLink.href = URL.createObjectURL(data);
  downloadLink.click();
};
