import { Component } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

class SystemSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {
        siteName: "Support Ticket System",
        supportEmail: "support@example.com",
        maxFileSize: 10,
        enableUserRegistration: true,
        enableNotifications: true,
      },
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [name]: value,
      },
    }))
  }

  handleSwitchChange = (name) => {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [name]: !prevState.settings[name],
      },
    }))
  }

  handleSave = () => {
    // In a real application, you would save these settings to your backend
    console.log("Saving settings:", this.state.settings)
  }

  render() {
    const { settings } = this.state

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">System Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure the general settings for your support system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" name="siteName" value={settings.siteName} onChange={this.handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
              <Input
                id="maxFileSize"
                name="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="enableUserRegistration"
                checked={settings.enableUserRegistration}
                onCheckedChange={() => this.handleSwitchChange("enableUserRegistration")}
              />
              <Label htmlFor="enableUserRegistration">Enable User Registration</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={() => this.handleSwitchChange("enableNotifications")}
              />
              <Label htmlFor="enableNotifications">Enable Notifications</Label>
            </div>
          </CardContent>
        </Card>

        <Button onClick={this.handleSave}>Save Settings</Button>
      </div>
    )
  }
}

export default SystemSettings

