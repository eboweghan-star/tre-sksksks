namespace LoaderApp;

public sealed class MainForm : Form
{
    private readonly Label _statusLabel;
    private readonly Button _runButton;
    private readonly TextBox _logBox;

    public MainForm()
    {
        Text = "Loader App";
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(480, 320);
        Size = new Size(520, 360);
        FormBorderStyle = FormBorderStyle.FixedSingle;
        MaximizeBox = false;

        var title = new Label
        {
            Text = "Ready — no login required",
            AutoSize = false,
            Dock = DockStyle.Top,
            Height = 48,
            TextAlign = ContentAlignment.MiddleCenter,
            Font = new Font(Font.FontFamily, 12F, FontStyle.Bold)
        };

        _statusLabel = new Label
        {
            Text = "Status: Idle",
            AutoSize = false,
            Dock = DockStyle.Top,
            Height = 32,
            TextAlign = ContentAlignment.MiddleLeft,
            Padding = new Padding(12, 0, 12, 0)
        };

        _runButton = new Button
        {
            Text = "Run",
            Dock = DockStyle.Top,
            Height = 40,
            Margin = new Padding(12)
        };
        _runButton.Click += OnRunClicked;

        _logBox = new TextBox
        {
            Multiline = true,
            ReadOnly = true,
            ScrollBars = ScrollBars.Vertical,
            Dock = DockStyle.Fill,
            Font = new Font("Consolas", 9F),
            BackColor = Color.FromArgb(24, 24, 24),
            ForeColor = Color.FromArgb(220, 220, 220),
            BorderStyle = BorderStyle.None
        };

        var logPanel = new Panel
        {
            Dock = DockStyle.Fill,
            Padding = new Padding(12)
        };
        logPanel.Controls.Add(_logBox);

        Controls.Add(logPanel);
        Controls.Add(_runButton);
        Controls.Add(_statusLabel);
        Controls.Add(title);

        AppendLog("Application started.");
        AppendLog("No username or password is required.");
    }

    private void OnRunClicked(object? sender, EventArgs e)
    {
        _runButton.Enabled = false;
        _statusLabel.Text = "Status: Running...";

        try
        {
            AppendLog("Running main action...");
            // Add your own startup logic here (load config, start a process, etc.).
            AppendLog("Done.");
            _statusLabel.Text = "Status: Completed";
        }
        catch (Exception ex)
        {
            AppendLog($"Error: {ex.Message}");
            _statusLabel.Text = "Status: Failed";
            MessageBox.Show(
                this,
                ex.Message,
                "Error",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
        }
        finally
        {
            _runButton.Enabled = true;
        }
    }

    private void AppendLog(string message)
    {
        _logBox.AppendText($"[{DateTime.Now:HH:mm:ss}] {message}{Environment.NewLine}");
    }
}
