;;; Directory Local Variables
;;; For more information see (info "(emacs) Directory Variables")

((nil
  (eval progn
        (let
            ((base-path
              (locate-dominating-file default-directory ".dir-locals.el")))
          (setq-local backup-directory-alist
                      `((,(expand-file-name ".*" base-path)
                         \,
                         (expand-file-name ".backup" base-path)))))
        (when
            (and buffer-file-name
                 (string-match "client/src/.*\\.js\\'" buffer-file-name))
          (js2-jsx-mode)))
  (create-lock-file))
 (js2-jsx-mode
  (js2-strict-trailing-comma-warning)
  (js2-strict-missing-semi-warning))
 (js2-mode
  (js2-strict-trailing-comma-warning)
  (js2-strict-missing-semi-warning)))




