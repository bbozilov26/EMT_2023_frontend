import { memo } from "react";
import NotificationPanel from "../../shared-components/notificationPanel/NotificationPanel";
import QuickPanel from "../../shared-components/quickPanel/ShoppingCartQuickPanel";
import ChatPanel from "../../shared-components/chatPanel/ChatPanel";

function RightSideLayout3() {
  return (
    <>
      <QuickPanel />

      <NotificationPanel />
    </>
  );
}

export default memo(RightSideLayout3);
