get-contracts gcpath="../pandasia":
  #!/bin/zsh

  echo $gcpath
  echo {{gcpath}}
  
  CURRENT=$PWD

  CONTRACTS=("Pandasia")

  cd {{gcpath}}
  if [[ ! -d "node_modules" ]]; then
    yarn
  fi
  forge build

  cd $CURRENT

  rm -rf src/contracts
  mkdir -p src/contracts

  for contract in "${CONTRACTS[@]}"; do
    CONTRACT_PATH={{gcpath}}/artifacts-forge/contracts/$contract.sol/$contract.json
    echo $CONTRACT_PATH

    CURRENT_CONTRACT="src/contracts/$contract.ts"
    
    cp $CONTRACT_PATH src/contracts
    mv src/contracts/$contract.json src/contracts/$contract.ts

    sed -i '' '1,2d' $CURRENT_CONTRACT

    sed -i '' "1i\ 
    const $contract = [" $CURRENT_CONTRACT

    sed -i '' '/"bytecode":/,$d' $CURRENT_CONTRACT

    sed -i '' '$d' $CURRENT_CONTRACT

    sed -i '' '$a\
    ] as const
    ' $CURRENT_CONTRACT

    echo "" >> $CURRENT_CONTRACT
    echo "export default $contract" >> $CURRENT_CONTRACT

  done
