import { useState } from "react";
import { Box, Tabs, Tab, Typography, Card, CardContent } from "@mui/material";
import ProfileSettings from "../../components/profileSettings/ProfileSettings";
import PasswordSettings from "../../components/passwordSettings/PasswordSettings";
import { useFormatMessage } from "../../hooks/useFormatMessage";

export default function SettingsPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const formattedMessage = useFormatMessage();
  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f5f5f5">
      <Box width={200} bgcolor="white" p={2} boxShadow={1}>
        <Tabs
          orientation="vertical"
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
        >
          <Tab label={formattedMessage("profilePage.profile")} />
          <Tab label={formattedMessage("profilePage.password")} />
        </Tabs>
      </Box>

      <Box flex={1} p={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" mb={2}>
              {tabIndex === 0
                ? formattedMessage("profilePage.profileTitle")
                : formattedMessage("profilePage.passwordTitle")}
            </Typography>
            {tabIndex === 0 ? <ProfileSettings /> : <PasswordSettings />}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
