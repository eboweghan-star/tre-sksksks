package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os/exec"
	"runtime"
	"strings"
	"time"
)

//go:embed web/*
var content embed.FS

func main() {
	port, err := freePort()
	if err != nil {
		log.Fatal(err)
	}

	url := fmt.Sprintf("http://127.0.0.1:%d", port)

	webFS, err := fs.Sub(content, "web")
	if err != nil {
		log.Fatal(err)
	}

	handler := spaHandler(webFS)
	server := &http.Server{
		Addr:    fmt.Sprintf("127.0.0.1:%d", port),
		Handler: handler,
	}

	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()

	time.Sleep(200 * time.Millisecond)
	openBrowser(url)

	fmt.Println("Control Panel is running.")
	fmt.Println("Open:", url)
	fmt.Println("Press Enter to quit...")
	fmt.Scanln()

	server.Close()
}

func spaHandler(fsys fs.FS) http.Handler {
	fileServer := http.FileServer(http.FS(fsys))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := strings.TrimPrefix(r.URL.Path, "/")
		if path == "" {
			path = "index.html"
		}

		if _, err := fs.Stat(fsys, path); err != nil {
			r.URL.Path = "/index.html"
		}

		fileServer.ServeHTTP(w, r)
	})
}

func freePort() (int, error) {
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return 0, err
	}
	defer listener.Close()
	return listener.Addr().(*net.TCPAddr).Port, nil
}

func openBrowser(url string) {
	var cmd *exec.Cmd

	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("cmd", "/c", "start", "", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}

	_ = cmd.Start()
}
