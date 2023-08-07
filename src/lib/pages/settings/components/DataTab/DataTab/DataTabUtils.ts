import { type ExportAppDBData } from '../../../../../DB/utils.js';
import { utilsWithCatch } from '../../../../../DB/utilsWithCatch.js';

/* -------------------------------------------------------------------------- */
/*                                  transfer                                  */
/* -------------------------------------------------------------------------- */

export const exportAppData = async () => {
  const data = await (<ExportAppDBData>utilsWithCatch.get("exportAppDBData")!)();
  const downloadLink = document.createElement("a");
  downloadLink.download = "dictionaryData.dic";
  downloadLink.href = URL.createObjectURL(data);
  downloadLink.click();
};
