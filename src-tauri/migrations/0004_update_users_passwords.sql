-- Atualiza a senha do usuário 'admin' (Exemplo de hash para a senha 'admin')
UPDATE users 
SET password_hash = '$2a$12$zj/V8vLClAWue2zGxIYIPeVxASzzYSWnsqUXgEsr/ADnC6xSJ9zvy'
WHERE username = 'admin';

-- Atualiza a senha do usuário 'reset' (Exemplo de hash para a senha 'admin')
UPDATE users 
SET password_hash = '$2a$12$zj/V8vLClAWue2zGxIYIPeVxASzzYSWnsqUXgEsr/ADnC6xSJ9zvy'
WHERE username = 'reset';